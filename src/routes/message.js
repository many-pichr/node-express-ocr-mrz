import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import {datas} from './data';
const router = Router();
const delay = ms => new Promise(res => setTimeout(res, ms));
router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
function getFieldName(i){
  const fieldName={26:'nationality',185:'age',3:'expiration_date', 12: 'gender', 5: 'date_of_birth',2: 'number', 0: 'type', 8: 'last_name', 9: 'first_name'}
  return fieldName[i];
}
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
    data: data
  }
  await axios.post('https://api.regulaforensics.com/api/process', data,{timeout: 30000})
      .then((res) => {
          console.log('Status:',res.data);
          const items=res.data.ContainerList.List[5].Text.fieldList;
          if(items.length>0){
            for(var i=0;i<items.length;i++){
              const item=items[i];
              if(getFieldName(item.fieldType)!=undefined){
                mrz[getFieldName(item.fieldType)]= item.value; 
              }           
            }
           result = {
              status: true,
              data: mrz
            }
          }else{
            result = {
              status: false,
              data: null
            }
          }
      }).catch((err) => {
          console.error(err);
      });
  // await delay(3000)
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
