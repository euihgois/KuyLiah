const {User,Programme,University,Profile } = require('../models')
const bcrypt = require('bcryptjs')
const sequelize = require('sequelize')
const showChance = require('../helpers/index')

class Controller{
    static index(req,res){
        res.render('mainPage')
    }

    static registerFormGet(req,res){
        University.findAll()
        .then(result=>{
            res.render('login/registerForm' , {result})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static registerFormPost(req,res){
        const {email,password,name,age,school,score,gender,UniversityId } = req.body
        User.create({
            email: email,
            password: password,
        })
        .then(result =>{
            const UserId = +result.id
            return Profile.create({
                name: name,
                age: age,
                school: school,
                score: score,
                gender: gender,
                UserId: UserId,
                UniversityId: UniversityId
            })
        })
        .then(() => {
            res.redirect('./login')
        })
        .catch((err) => {
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }

    static loginGet(req,res){
        const error = req.query.error
        res.render(`login/login` , {error} )
    }

    static loginPost(req,res){
        const {email, password} = req.body
        User.findOne({
            where: {
                email: email
            }
        })
        .then((user)=>{
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword){
                    req.session.userId = user.id
                    if (user.role === 'student') {
                        return res.redirect(`../student/${user.id}`)
                    } else if(user.role === 'admin'){
                        return res.redirect(`../admin/${user.id}`)
                    } else { // tambahin else if admin
                        const error = `Invalid email or password`
                        return res.redirect(`/login?error=${error}`)
                    }
                }else {
                    const error = `Invalid email or password`
                    return res.redirect(`/login?error=${error}`)
                }
            }
        })
        .catch((err) => {
            res.send(err)
        })
        
    }

    static logout(req,res){
        req.session.destroy((err)=> {
            if (err) {
                console.log(err);
            } else {
                res.redirect('../login')
            }
        })
        
    }

    static showPage(req, res) {
        let option = {
            attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('min_score'))), 'average']],
            include: {
                all: true
            },
            group: 'University.id'
        }
        
        Programme.findAll(option)
            .then(result => {
                let studentId = req.params.studentId;
                res.render(`student/list_universities` , {result, studentId})
            })
            .catch(err => res.send(err))
        }

    
    static showProfile(req, res) {
        let id = req.params.studentId
        Profile.findByPk(id,{
            include : University
        })
        .then(result=>{
            res.render("student/profile" , {result})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static showDetail(req, res) {
        let option1 = {
            include: {
                model: University
            },
            where: {
                UniversityId: +req.params.universityId
            }
        }
        let data = {}

        Profile.findByPk(+req.params.studentId)
            .then(student => {
                data = {...data, student};
                return Programme.findAll(option1)
            })
            .then(programmes => {
                programmes = programmes.map(({name, min_score}) => {
                    let chance = showChance(data.student.score, min_score);
                    return {name, chance}
                })
                data = {...data, programmes}
                // res.render('student/show_detail', data)

                let option = {
                    attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('min_score'))), 'average']],
                    include: {
                        all: true
                    },
                    group: 'University.id',
                    where: {
                        UniversityId: +req.params.universityId
                    }
                }
                return Programme.findAll(option)
            })
            .then(average => {
                data = {...data, average}
                res.render('student/show_detail', data)
            })
            .catch(err => res.send(err))
    }

    static showEdit(req, res) {
        Profile.findByPk(+req.params.studentId)
            .then(student => {
                res.render('student/edit_profile', {student})
            })
            .catch(err => res.send(err))
    }

    static editStudent(req, res) {
        let editedStudent = req.body
        let option = {
            where: {
                id: +req.params.studentId
            }
        }
        Profile.update(editedStudent, option)
            .then(() => {
                res.redirect(`/student/${req.params.studentId}/profile`)
            })
            .catch(err => res.send(err))
    }

    static showAdmin(req,res){
        let option = {
            attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('min_score'))), 'average']],
            include: {
                all: true
            },
            group: 'University.id'
        }
            Programme.findAll(option)
            .then(result => {
                let adminId = req.params.adminId;
                res.render(`admin/list_admin` , {result, adminId})
            })
            .catch(err => res.send(err))
    }
    
    static getaddAdmin(req,res){
        let id = req.params.adminId
        Profile.findByPk(+id)
        .then(result=>{
            res.render('admin/addUniv' , {result})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static postaddAdmin(req,res){
        let adminId = req.params.adminId 
        const { nameUniv, namePro, min_score, min_age} = req.body
        University.create({
            name: nameUniv
        },{
            returning:true
        })
        .then(result =>{
            const UniversityId = +result.id
            return Programme.create({
                name: namePro,
                min_score: min_score,
                min_age: min_age,
                UniversityId : UniversityId
            })
        })
        .then(()=>{
            res.redirect(`/admin/${adminId}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static profileEdmin(req,res){
        let id = req.params.adminId
        Profile.findByPk(id,{
            include : University
        })
        .then(result=>{
            res.render("admin/profile" , {result})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static delete(req, res) {
        let option = {
            where: {
                UniversityId: +req.params.universityId
            }
        }
        Programme.destroy(option)
        .then(() => {
            return University.destroy({
                where: {
                    id: +req.params.universityId
                }
            })
        })
        .then(() => {
            res.redirect(`/admin/${req.params.adminId}`)
        })
        .catch(err => res.send(err))
        }
}

module.exports = Controller