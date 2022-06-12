// TODAS LAS PLANCHAS DEBEN DE IR EN LA MISMA ORIENTACION
const planchaUsuario = {
  base: 600, //250 a 2500
  altura: 630 //500 a 5500
}

const ORIENTACION_TYPES = {
  cuadrado: 'cuadrado',
  horizontal: 'horizontal',
  vertical: 'vertical'
}

const PALES_LIST = [
  {
    orientacion: ORIENTACION_TYPES.cuadrado,
    cantidad: 1,
    base: 800,
    altura: 1200,
    area: 960000
  },
  {
    orientacion: ORIENTACION_TYPES.cuadrado,
    cantidad: 1,
    base: 1000,
    altura: 1200,
    area: 1200000
  },
  {
    orientacion: ORIENTACION_TYPES.cuadrado,
    cantidad: 4,
    base: 1600,
    altura: 2400,
    area: 3840000
  },
  {
    orientacion: ORIENTACION_TYPES.cuadrado,
    cantidad: 4,
    base: 2000,
    altura: 2400,
    area: 4800000
  },
  {
    orientacion: ORIENTACION_TYPES.cuadrado,
    cantidad: 9,
    base: 2400,
    altura: 3600,
    area: 8640000
  },
  {
    orientacion: ORIENTACION_TYPES.cuadrado,
    cantidad: 9,
    base: 3000,
    altura: 3600,
    area: 10800000
  },
  {
    orientacion: ORIENTACION_TYPES.horizontal,
    cantidad: 2,
    base: 1600,
    altura: 1200,
    area: 1920000
  },
  {
    orientacion: ORIENTACION_TYPES.horizontal,
    cantidad: 2,
    base: 2000,
    altura: 1200,
    area: 2400000
  },
  {
    orientacion: ORIENTACION_TYPES.horizontal,
    cantidad: 3,
    base: 2400,
    altura: 1200,
    area: 2880000
  },
  {
    orientacion: ORIENTACION_TYPES.horizontal,
    cantidad: 3,
    base: 3000,
    altura: 1200,
    area: 3600000
  },
  {
    orientacion: ORIENTACION_TYPES.vertical,
    cantidad: 2,
    base: 800,
    altura: 2400,
    area: 1920000
  },
  {
    orientacion: ORIENTACION_TYPES.vertical,
    cantidad: 2,
    base: 1000,
    altura: 2400,
    area: 2400000
  },
  {
    orientacion: ORIENTACION_TYPES.vertical,
    cantidad: 3,
    base: 800,
    altura: 3600,
    area: 2880000
  },
  {
    orientacion: ORIENTACION_TYPES.vertical,
    cantidad: 3,
    base: 1000,
    altura: 3600,
    area: 3600000
  }
]

function calcularArea (base, altura) {
  return base * altura
}

// // para calcular el area de todos los pales
// console.info(
//   PALES_LIST.map(pale => ({ area: calcularArea(pale.base, pale.altura) }))
// )

const areaPlanchaUsuario = calcularArea(
  planchaUsuario.base,
  planchaUsuario.altura
)

function isInside (medidaPale, medidaPlancha, offset = 0) {
  return !!parseInt((medidaPale + offset) / medidaPlancha)
}

function findPaleMatchPlancha (numeroMaximoPlanchas, pale, plancha) {
  for (let i = numeroMaximoPlanchas; i > 0; i--) {
    if (isInside(pale.base, plancha.base * i)) {
      if (isInside(pale.altura, plancha.altura * i)) {
        // match de plancha
        return { ...pale, cantidadPlanchas: i }
      }
    }
  }
}

PALES_LIST.map(({ area, ...pale }) => {
  const numeroMaximoPlanchas = parseInt(area / areaPlanchaUsuario)

  const match = findPaleMatchPlancha(numeroMaximoPlanchas, pale, planchaUsuario)
  const matchPaleInvertido = findPaleMatchPlancha(
    numeroMaximoPlanchas,
    { ...pale, base: pale.altura, altura: pale.base },
    planchaUsuario
  )

  return match.cantidadPlanchas >= matchPaleInvertido.cantidadPlanchas
    ? match
    : matchPaleInvertido
})

console.log(PALES_LIST)
