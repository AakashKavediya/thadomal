"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from './service/CustomerService';
import { CardOne } from '../components/cardOne';
import { BannerOne } from '../components/bannerOne';
import { PageOne } from '../components/pageOne';

export default function PaginatorBasicDemo() {


    return (
        <div className="card">
            <CardOne />
            <BannerOne />
            <PageOne />
        </div>  
    );
}
        