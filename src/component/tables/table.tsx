import React from 'react';

class TableComponent extends React.Component<{column:any}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <table id="dtBasicExample" className="table table-striped table-bordered table-sm" width="100%">
                <thead>
                    <tr>
                        {
                            this.props.column.map((col:any) => {
                                return (
                                    <th className="th-sm">{col}
                                    </th>
                                )
                            })
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(row => {
                            return (
                                <tr>
                                    <td>Tiger Nixon</td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                </tr>
                            )
                        }

                        )
                    }
                </tbody>

            </table>
        )
    }
}

export default TableComponent;