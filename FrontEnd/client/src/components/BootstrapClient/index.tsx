"use client"
import { useEffect } from "react";

export default function BootstrapClient(){
    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.js");
        require("bootstrap/dist/js/bootstrap.min.js");
        require("bootstrap/dist/js/bootstrap.bundle.js");
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    },[])
    return null
}

