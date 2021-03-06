import React, { useEffect, useState, SelectHTMLAttributes } from 'react';
import Select from './Select';

import axios from 'axios'
import '../styles/components/selectuf.css';
import { toast } from 'react-toastify';

interface SelectProps {
    id: string;
    value: string;
}

interface IBGEUFProps {
    sigla: string;
    nome: string;
  }

interface SelectUFsProps extends SelectHTMLAttributes<HTMLSelectElement>  {
    options?: Array<{
        id: string, value: string;
    }>;
  }

const SelectUF: React.FC<SelectUFsProps> = ({ options, ...rest}) => 
{  
    const [ufs, setUfs] = useState<SelectProps[]>([])

    useEffect(() => {
     
      
        ufs.length = 0;

        setUfs([...ufs, { id: "0", value: "Selecione uma estado" } ])

        async function HandleloadStates() {
          return await axios.get<IBGEUFProps[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then(response => {
            response.data.forEach(uf => { 
                setUfs(ufs => ([...ufs, { id: uf.sigla, value: uf.nome} ]))
              } )
          }).catch(error => toast.error('Ocorreu um erro ao recuperar dados do IBGE'));
        }
        
        HandleloadStates();


      }, [])
           
    return (
            <Select name="estado" {...rest} tipo="um estado"
            options={options? options  : ufs.sort((a, b) => a.id > b.id ? 1 : -1)}   />
    )
}

export default SelectUF