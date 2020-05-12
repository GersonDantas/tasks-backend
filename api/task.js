const moment = require('moment')

module.exports = app => {
    const getTask = (req, res) => {
        const date = req.query.date ? req.query.date
            :moment().endOf('day').toDate()

        app.db('tasks')
            .where({userId: req.user.id})
            .where('estmateAt','<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).json(err))
    }
    const save = (req, res) => {
        if (!req.body.desc.trim()){
            res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_=> res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .del()
            .then(rowsDelete => {
                if (rowsDelete > 0){
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado task com o Id ${req.parms.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .update()
            .then(_=>res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .first()
            .then(task => {
                if (!task){
                    const msg = `Task com o id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateDoneAt(req, res, doneAt)
            })
            .catch(err=>res.status(400).json(err))
    }
    return {getTask,save,remove,toggleTask}
}