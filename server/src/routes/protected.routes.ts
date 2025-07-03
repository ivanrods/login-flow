import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Você acessou uma rota protegida!',
    user: req.user
  })
})

export default router
