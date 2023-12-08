import { $query, $update, nat } from 'azle';

// This is a global variable that is stored on the heap
let counter : nat = BigInt(0);

// Query calls complete quickly because they do not go through consensus
$query;
export function get(): nat {
    return counter;
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function add(n : nat): nat {
    counter += n; //
    return counter;
}


$update;
export function inc(): nat {
    counter += BigInt(1);
    return counter
}

/*
import {
    query,
    update,
    Record,
    StableBTreeMap,
    Vec,
    nat64,
    Opt,
    text,
    Canister, 
    bool,   
    blob
  } from "azle";

  import { v4 as uuidv4 } from "uuid";


  
  const User = Record({
    id:text,
    name:text,
    houses:nat64,
    contact:text,
    verified:bool
  });

  const UserPayload = Record({
    name:text,
    houses:nat64,
    contact:text,
    verified:bool
  });
  
  const House = Record({
    id: text,
    owner_id:text,
    image:blob,
    isBooked:bool,
    rooms:nat64,
    bathrooms:nat64,
    ensuit:bool,
    address:text,
    rating:text
  });

  const HousePayload = Record({
    owner_id:text,
    
    image:blob,
    isBooked:bool,
    rooms:nat64,
    bathrooms:nat64,
    ensuit:bool,
    address:text,
  });



  type User = typeof User;
  type House = typeof House;
  type HousePayload = typeof HousePayload;
  type UserPayload = typeof UserPayload;

  let userStorage = StableBTreeMap<text,User>(text,User,0);
  let houseStorage = StableBTreeMap<text,House>(text,House,0);


  
  
  const Message = Record({
    id: text,
    title: text,
    body: text,
    attachmentURL: text,
    createdAt: nat64,
    updatedAt: Opt(nat64),
  });
  
  type Message = typeof Message;
  
  const MessagePayload = Record({
    title: text,
    body: text,
    attachmentURL: text,
  });
  type MessagePayload = typeof MessagePayload;
  
  //let messageStorage = StableBTreeMap<text, Message>(text, Message, 0);
  
  export default Canister({

    addHouse: update([HousePayload],House,(payload)=>{
      const house: House={
        id: uuidv4(),
        ...payload,
        rating:"*"
      }
      houseStorage.insert(house.id,house);
      return house;
    }),
    
    getHouse: query([text],Opt(House),(id)=>{
      return houseStorage.get(id);
    }),

    getHouses: query([],Vec(House),()=>{

      return houseStorage.values();
    }),

    getBookedHouses: query([],House,()=>{
      return houseStorage.values(House.isBooked===true);
    }),


  
    deleteHouse: update([text], Opt(House), (id) => {
      return houseStorage.remove(id);
    }),
  });
  
  // a workaround to make uuid package work with Azle
  globalThis.crypto = {
    // @ts-ignore
   getRandomValues: () => {
       let array = new Uint8Array(32)
  
       for (let i = 0; i < array.length; i++) {
           array[i] = Math.floor(Math.random() * 256)
       }
  
       return array
   }
  }

*/