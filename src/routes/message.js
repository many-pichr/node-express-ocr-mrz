import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
const router = Router();
const delay = ms => new Promise(res => setTimeout(res, ms));
router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
function getFieldName(i){
  const fieldName={0:'nationality',4:'age',8:'expiration_date', 9: 'gender', 11: 'date_of_birth',13: 'number', 15: 'type', 20: 'last_name', 21: 'first_name'}
  return fieldName[i]?fieldName[i]:'field'+i;
}
const arrValues = [0,4,8,9,11,13,15,20,21]

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', async (req, res) => {

  const axios = require('axios');

  const data = {
    "processParam": 
    {"scenario": "Mrz", 
    "doublePageSpread": true, 
    "measureSystem": 0, 
    "dateFormat": "M/d/yyyy"
    },
    "List": [{"ImageData": 
    {
      "image": req.body.image
    }, "light": 6, "page_idx": 0}]
  };

  const mrz={};
  var result = {
    status: false,
    data: {
      "nationality": "KHM",
      "age": "24",
      "expiration_date": "6/23/2025",
      "gender": "F",
      "date_of_birth": "3/1/1998",
      "number": "040436265",
      "type": "ID",
      "last_name": "PHAT",
      "first_name": "SREYNIT"
  }
  }
  // await axios.post('https://api.regulaforensics.com/api/process', data,{timeout: 30000})
  //     .then((res) => {
  //         console.log('Status:',res.data);
  //         const items=res.data.ContainerList.List[5].Text.fieldList;
  //         if(items.length>0){
  //           for(var i=0;i<items.length;i++){
  //             const item=items[i];
  //             if(arrValues.indexOf(i) > -1){
  //                 mrz[getFieldName(i)]= item.value; 
  //             }
              
  //           }
  //           result = {
  //             status: true,
  //             data: mrz
  //           }
  //         }else{
  //           result = {
  //             status: false,
  //             data: null
  //           }
  //         }
  //     }).catch((err) => {
  //         console.error(err);
  //     });
  await delay(3000)
  return res.send(result);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
