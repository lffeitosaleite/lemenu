'use strict'

const Validator = use('Validator')
const Measure = use('App/Model/Measure')

class MeasureController {
  * getByName (request, response) {
    const measure = yield Measure.findBy('name', request.param('name'))
    response.json(measure)
  }

  * get (request, response) {
    const measure = yield Measure.find(request.param('id'))
    response.json(measure)
  }

  * getAll (request, response) {
    const measures = yield Measure.all()
    response.json(measures)
  }

  * create (request, response) {
    const validation = yield Validator.validate(request.all(), Measure.rules, Measure.messages)

    if (validation.fails()) {
      response.json(validation.messages())
      return
    }

    const measure = new Measure()
    measure.fill(request.all())
    yield measure.save()

    response.json({message: 'Medida criada com sucesso'})
  }
}

module.exports = MeasureController