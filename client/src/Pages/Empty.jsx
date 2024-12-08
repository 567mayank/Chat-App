import axios from 'axios';
import React,{useEffect} from 'react'
import { db } from '../Constant';

function Empty() {
  useEffect(() => {
    // for keeping backend alive
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
    axios.get(`${db}/keep-alive`)
  }, []); 

  return (
    <div></div>
  )
}

export default Empty