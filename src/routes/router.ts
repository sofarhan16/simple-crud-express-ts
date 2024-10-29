import express, { Router } from "express";
import { allAuthors, authorsByid, createAuthors, updateAuthors } from "../authors/controller";



const router = Router();


// router.post('/authors', )
router.get('/authors/:id', authorsByid)
router.post('/authors', createAuthors)
router.get('/authors', allAuthors)
router.put('/authors/:id', updateAuthors)

export default router