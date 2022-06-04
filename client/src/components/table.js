import React,{useRef} from 'react'
import SearchIcon from '@material-ui/icons/Search';

import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery';
import TextBox from './textbox'
import Select from '../components/select'

export default function ({
    className = '',
    columns,
    data = [],
    isSort,
    controlAddOn,
    onFilter=()=>{},
    pagination,
    onPageChange,
    isLoading,
}) {
    let timeoutInput;
    const selectRef = useRef(null)
    const renderPagination = (totalPage) => {
        let arrayPage = []
        let pageActive = pagination.currentPage || 1
        for (let idx = 1; idx <= totalPage; idx++) {
            arrayPage.push(
                <li
                    key={idx}
                    className={`page-item ${idx == pageActive ? 'active' : ''}`}
                    onClick={() => onPageChange(idx)}
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
                            <select ref={selectRef}>
                                {columns.filter(i => i.isSearchable).map((i, key) => <option key={key} value={i.isSearchable}>{i.label}</option>)}
                            </select>
                            <input type="text"
                                onChange={e => {
                                    clearTimeout(timeoutInput)
                                    timeoutInput = setTimeout(() => {
                                        console.log({key:selectRef.current.value, value:e.target.value});
                                        onFilter({key:selectRef.current.value, value:e.target.value})
                                    }, 300);
                                }}
                                autoComplete="off"
                            />
                            <SearchIcon className="search-box__icon" />
                        </div>
                    )
                }
                <div className="group-control">
                    
                    {controlAddOn && controlAddOn()}
                    {
                        isSort && (
                            <div className="sort-box">
                                <select>
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="name-A-Z">Từ A-Z</option>
                                    <option value="name-Z-A">Từ Z-A</option>
                                </select>
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
                        isLoading && <tr style={{ textAlign: 'center' }}><td colSpan={columns.length}>Loading...</td></tr>
                    }
                    {
                        !isLoading && data && data.length == 0 && <tr style={{ textAlign: 'center' }}><td colSpan={columns.length}>Không dữ liệu nào được tìm thấy</td></tr>
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
