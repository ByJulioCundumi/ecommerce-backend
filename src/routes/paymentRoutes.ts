import { Router } from 'express';
import { createSession} from '../controller/paymentController.js';
import { paymentAuthRequired } from '../midleware/authRequired.js';

const router = Router()
router.post("/payment-checkout", paymentAuthRequired, createSession)

export default router;