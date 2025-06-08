import React, { useState } from 'react';
export default function Form() {
    const [desc, setDesc] = useState('');
    const[amount, setAmount] = useState('');
    const[isExpense, setIsExpense] = useState(false);

    const handleSave = () => {
        if (!desc || !amount) {
            alert('Informe a descrição e o valor da transação!');
            return;
        }
        else if (isNaN(amount)) {
            alert('O valor da transação deve ser um número positivo!');
            return;
        }
    }

    return (
        <>  
            
        </>
    )
}