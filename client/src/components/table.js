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
    pagination,
    onPageChange,
    isLoading,
}) {

    const renderPagination = (totalPage) =>  {
        let arrayPage = []
        let pageActive = pagination.currentPage || 1
        for (let idx = 1; idx <= totalPage; idx++) {
            arrayPage.push(
                <li 
                key={idx} 
                className={`page-item ${idx==pageActive?'active':''}`}
                onClick={()=>onPageChange(idx)}
                >{idx}</li>
            )
        }
        return arrayPage
    }

    return (
        <div className={`table ${className}`}>
            <div className="table__top">
                {
                    columns.filter(i => i.isSearchable)?.length > 0 && (
                        <div className="search-box">
                            <Select options={columns.filter(i => i.isSearchable).map(i => i.label)}/>
                            <TextBox/>
                            <SearchIcon className="search-box__icon" />
                        </div>
                    )
                }
                <div className="group-control">
                    {controlAddOn && controlAddOn()}
                    {
                        isSort && (
                            <div className="sort-box">
                                <Select options={["Mới nhất", "Cũ nhất", "Từ A-Z", "Từ Z-A"]} />
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
                        !isLoading && data && data.length > 0 && data.map((row, keyRow) => (
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
                    {
                        isLoading && <tr style={{textAlign:'center'}}><td colSpan={columns.length}>Loading...</td></tr>
                    }
                </tbody>
            </table>
            {pagination?.totalPage > 1 && (
                <div className="table__bottom">
                    <ul className="pagination">
                        {renderPagination(pagination.totalPage)}
                    </ul>
                </div>
            )}
        </div>
    )
}
