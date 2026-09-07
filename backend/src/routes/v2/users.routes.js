import {Router} from "express";

const router = Router();

// READ users
router.get("/", (req, res) => {
  try {
    
  } catch (err) {
    next(err);
  }
});

// CREATE users
router.post("/", (req, res) => {
  try {
    
  } catch (err) {
    next(err);
  }
});


// Update users
router.put("/:id", (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
});

// Delete users
router.delete("/:id", (req, res, next) => {
 try {
    
 } catch (err) {
    next(err);
 }
});

export default router;