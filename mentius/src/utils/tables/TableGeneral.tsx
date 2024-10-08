interface TableGeneralProps<T> {
    headers: string[];            
    data: T[];                     
    actions?: (item: T) => JSX.Element;  
  }
  
  export const TableGeneral = <T,>({ headers, data, actions }: TableGeneralProps<T>) => {
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {actions && <th>Actions</th>} 
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={index}>{(row as any)[header]}</td>
              ))}
              {actions && <td>{actions(row)}</td>} 
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  