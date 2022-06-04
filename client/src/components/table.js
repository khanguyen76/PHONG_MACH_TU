import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery';
import TextBox from './textbox'
import Select from '../components/select'

export default function ({
    className='',
    columns,
    data = [],
    isSort,
    controlAddOn,
    pagination
}) {
    const handleChange = (value) => {
        console.log("handleChange value="+value.target.value)
    }

    const handleSelectChange = (value) => {
        console.log("handleSelectChange value="+value.target.value)
    }

    return (
        <div className={`table ${className}`}>
            <div className="table__top">
                {
                    columns.filter(i => i.isSearchable)?.length > 0 && (
                        <div className="search-box">
                            <Select options={columns.filter(i => i.isSearchable).map(i => i.label)} onChange={handleSelectChange} />
                            <TextBox onChangeValue={handleChange} />
                            <SearchIcon className="search-box__icon" />
                        </div>
                    )
                }
                <div className="group-control">
                    {controlAddOn && controlAddOn()}
                    {
                        isSort && (
                            <div className="sort-box">
                                <Select options={["Mới nhất", "Cũ nhất", "Từ A-Z", "Từ Z-A"]} onChange={handleSelectChange} />
                            </div>
                        )
                    }
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {
                            columns?.map((col, key) => (
                                <th
                                    key={key}
                                    style={{
                                        textAlign: col.textAlign || "left"
                                    }}
                                    {...col.props}
                                >
                                    {col.label}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 && data.map((row, keyRow) => (
                            <tr key={keyRow}>
                                {
                                    columns.map((col, keyCol) => (
                                        <td
                                            key={keyCol}
                                            style={{
                                                textAlign: col.textAlign || "left"
                                            }}
                                            {...col.props}
                                        >
                                            {typeof col.accessor == "function" ? col.accessor(row, keyRow) : row[col.accessor]}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {pagination && (
                <div className="table__bottom">
                    <ul className="pagination">
                        <li className="page-item active">1</li>
                        <li className="page-item">2</li>
                        <li className="page-item">3</li>
                    </ul>
                </div>
            )}
        </div>
    )
}
