import { React, useState } from 'react'
import TabContent from './tab-content'

export default function ({
    tabData,
    children
}) {
    const [tabActiveIndex, setTabActiveIndex] = useState(0)

    const onSelect = (key) => {
        setTabActiveIndex(key)
    }

    return (
        <div class="container">
            <div class="tab" role="tabpanel">
                <ul class="nav nav-tabs" role="tablist">
                    {tabData.map((data) =>
                        <li onClick={() => onSelect(data.key)} className={tabActiveIndex == data.key ? "active" : ""}><a href={data.href} data-toggle="tab">{data.text}</a></li>
                    )}
                </ul>
                {children.map((child, key) => (
                    <div className="tab-content tabs" hidden={key !== tabActiveIndex}>
                        {child}
                    </div>
                ))
                }
            </div>
        </div>
    )
}