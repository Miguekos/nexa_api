'use strict';

module.exports = function(Utils) {
  Utils.filtros = (data, cb) => {
    console.info('Incio Filtros');
    console.log(data);
    const ds = Utils.dataSource;

    // TODO: Variables globale
    let numeroArray = [];
    let ugbArray = [];
    let tb_product_json = [];
    let tb_gastos_sedes_json = [];
    let areaArray = [];
    let localArray = [];
    let fechaArray = [];
    let responsable_del_registroArray = [];
    let clasificacionArray = [];
    let potencial_de_gravedadArray = [];
    let riesgoArray = [];
    let descripcionArray = [];
    let accion_de_bloqueoArray = [];
    let generar_plan_accionArray = [];

    // TODO: Formateando output
    const result_json = {
      numeroArray,
      ugbArray,
      tb_product_json,
      tb_gastos_sedes_json,
      areaArray,
      localArray,
      fechaArray,
      responsable_del_registroArray,
      clasificacionArray,
      potencial_de_gravedadArray,
      riesgoArray,
      descripcionArray,
      accion_de_bloqueoArray,
      generar_plan_accionArray
    }

    //TODO: Funcion generica para ejecutar la query async/await
    function sampleFunc(query) {
      return new Promise(function(resolve, reject) {
        ds.connector.query(query, function(err, units) {
          if (err) {
            return reject(err);
          }
          return resolve(units);
        });
      });
    }

    //TODO: Descomentar para prbar con promesas
    // sampleFunc(`select * from tb_gastos_sede where created_at LIKE '%${data.fecha}%' limit 1`).then(function(units) {
    //   // do something with units
    //   console.log(units);
    // })
    //   .catch(function(err) {
    //     // do something with err
    //   });

    const main = async (arg) => {
      try {
        const numero = await sampleFunc(`select numero from tb_incidencias group by numero`)
        numeroArray.push(numero)
        const ugb = await sampleFunc(`select ugb from tb_incidencias group by ugb`)
        ugbArray.push(ugb)
        const area = await sampleFunc(`select area from tb_incidencias group by area`)
        areaArray.push(area)
        const local = await sampleFunc(`select local from tb_incidencias group by local`)
        localArray.push(local)
        const fecha = await sampleFunc(`select fecha from tb_incidencias group by fecha`)
        fechaArray.push(fecha)
        const responsable_del_registro = await sampleFunc(`select responsable_del_registro from tb_incidencias group by responsable_del_registro`)
        responsable_del_registroArray.push(responsable_del_registro)
        const clasificacion = await sampleFunc(`select clasificacion from tb_incidencias group by clasificacion`)
        clasificacionArray.push(clasificacion)
        const potencial_de_gravedad = await sampleFunc(`select potencial_de_gravedad from tb_incidencias group by potencial_de_gravedad`)
        potencial_de_gravedadArray.push(potencial_de_gravedad)
        const riesgo = await sampleFunc(`select riesgo from tb_incidencias group by riesgo`)
        riesgoArray.push(riesgo)
        const descripcion = await sampleFunc(`select descripcion from tb_incidencias group by descripcion`)
        descripcionArray.push(descripcion)
        const accion_de_bloqueo = await sampleFunc(`select accion_de_bloqueo from tb_incidencias group by accion_de_bloqueo`)
        accion_de_bloqueoArray.push(accion_de_bloqueo)
        const generar_plan_accion = await sampleFunc(`select generar_plan_accion from tb_incidencias group by generar_plan_accion`)
        generar_plan_accionArray.push(generar_plan_accion)
        await cb(null, result_json)
        console.info('Fin Reportes');
      } catch (e) {
        console.warn(e)
        cb(e, null)
      }
    }

    //TODO: Funcion que inicia todo el proceso
    main()
  }
};
