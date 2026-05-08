/**
 * Lógica para el cálculo de tablas de posiciones.
 * Adaptada para ser compatible con la estructura de datos local y futura de PocketBase.
 */

export function calculateStandings(matches, clubs, allDivisions, forLiguilla = false) {
  const relevant = matches.filter((match) => {
    const estado = (match.estado || "").toLowerCase();
    const tieneResultado = match.resultado && match.resultado.includes("-");
    
    if (forLiguilla) {
      return (estado === "completado" || estado === "finalizado") && tieneResultado;
    }
    return estado === "finalizado" && tieneResultado;
  });

  const standings = {
    general: {},
    byDivision: {},
  };

  // Inicializar estructuras para cada club y sus divisiones
  clubs.forEach((club) => {
    const emptyStats = () => ({
      club: club.nombre,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      dif: 0,
      pts: 0,
    });

    standings.general[club.nombre] = emptyStats();
    
    if (club.divisiones) {
      club.divisiones.forEach((division) => {
        if (!standings.byDivision[division]) standings.byDivision[division] = {};
        standings.byDivision[division][club.nombre] = emptyStats();
      });
    }
  });

  // Procesar cada partido
  relevant.forEach((match) => {
    const scores = match.resultado.split("-").map(Number);
    if (scores.length !== 2 || scores.some(Number.isNaN)) return;
    
    const [gLS, gVS] = scores;
    const home = standings.general[match.local];
    const away = standings.general[match.visitante];
    
    if (home && away) {
      updateTeamStats(home, gLS, gVS);
      updateTeamStats(away, gVS, gLS);
    }

    const divisionTable = standings.byDivision[match.division];
    if (divisionTable) {
      const homeDiv = divisionTable[match.local];
      const awayDiv = divisionTable[match.visitante];
      if (homeDiv) updateTeamStats(homeDiv, gLS, gVS);
      if (awayDiv) updateTeamStats(awayDiv, gVS, gLS);
    }
  });

  // Criterio de ordenamiento: Puntos -> Dif. Goles -> Goles Favor -> Nombre (A-Z)
  const sortTable = (a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dif !== a.dif) return b.dif - a.dif;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.club.localeCompare(b.club);
  };

  return {
    general: Object.values(standings.general).sort(sortTable),
    byDivision: Object.fromEntries(
      Object.entries(standings.byDivision).map(([division, table]) => [
        division,
        Object.values(table).sort(sortTable),
      ])
    ),
  };
}

function updateTeamStats(team, gf, gc) {
  team.pj += 1;
  team.gf += gf;
  team.gc += gc;
  team.dif = team.gf - team.gc;
  
  if (gf > gc) {
    team.pg += 1;
    team.pts += 3;
  } else if (gf < gc) {
    team.pp += 1;
  } else {
    team.pe += 1;
    team.pts += 1;
  }
}
