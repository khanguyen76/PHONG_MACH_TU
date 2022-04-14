
import React from "react";
import { useQuery } from "@apollo/client";
import { getItemById } from "../../../graphql-queries/BENH_NHAN";

export default function PatrientDetail({ patrientId = "" }) {
    console.log(patrientId);
    const {loading, error, data} = useQuery(getItemById,{
        variables:{
            id: patrientId,
        },
        // pollInterval: 10000,
    })
    if(loading) return <div>Loading...</div>
    if(!loading && error) return null
    return (
        <div>
            <ul>
                <li>Ma benh nhan: {data.BENH_NHAN._id}</li>
                <li>Ten benh nhan: {data.BENH_NHAN.ho_ten}</li>
                <li>Gioi tinh: {data.BENH_NHAN.gioi_tinh}</li>
                <li>Dia chi: {data.BENH_NHAN.dia_chi}</li>
            </ul>
        </div>
    )
}
