const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'Handling GET requests to /products '
    });
});

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message:'Handling POST nrequests to /products'
    });
})

router.get('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    if(id ==='special'){
        res.status(200).json({message:'You have Discovered the special ID',
            id:id
        });
    }else{
        res.status(200).json({message:'you passed as ID'});
    }
})

router.patch('/special',(req, res, next)=>{
    res.status(200).json({
        message:'Updated Product !'
    });
})


router.delete('/special',(req, res, next)=>{
    res.status(200).json({
        message:'Deleted Product !'
    });
})




module.exports = router;