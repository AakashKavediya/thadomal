"use client"
import React, { useState, useEffect } from "react";
import App from "./CustomComponents/searchFood";
import RecipeSuggestion from "./CustomComponents/resipieSuggestion";
import Header from "./CustomComponents/header";

export default function HomePage() {
  return(
    <div>
        <div>
          <Header />
          <RecipeSuggestion />
        </div>
    </div>
  )
}

