import { Router } from "express";
import { addNewCandidate, deleteCandidate, editCandidate, getAllCandidates } from "../controllers/candidateController.js";
const router = Router()

router.post("/newcandidate",addNewCandidate)
router.delete("/delcandidate",deleteCandidate)
router.put("/editcandidate",editCandidate)
router.get("/getallcandidates",getAllCandidates)
export default router