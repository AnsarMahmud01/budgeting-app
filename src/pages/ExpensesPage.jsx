import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { deleteItem, fetchData } from '../helpers'
import Table from '../components/Table'
import { toast } from 'react-toastify'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

export async function expensesLoader(){
    const expenses = await fetchData("expenses")
    return { expenses}
}

export async function expensesAction({request}){
  const data = await request.formData()
  const {_action,...values} = Object.fromEntries(data)

  if (_action==="deleteExpense") {
    try{
      deleteItem({
        key: "expenses",
        id: values.expenseId
      })
      return toast.success(`Expense deleted`)
    } catch(e){
      throw new Error("There was a problem deleting your expense")
    }
  }
}



const ExpensesPage = () => {
  const navigate = useNavigate()
  const {expenses} = useLoaderData()

  return <div className='grid-lg'>
    <h1>All Expenses</h1>
    {
        expenses && expenses.length > 0
        ? (
            <div className="grid-md">
                <h2>Recent Expenses <small>({expenses.length} total)</small>
                </h2>
                <Table expenses={expenses}/>
            </div>
        )
        : <p>Expenses to show</p>
    }
            <button className='btn btn--dark' onClick={()=>navigate(-1)}>
          <ArrowUturnLeftIcon width={20}/>
          <span>Go back</span>
        </button>
  </div>
}

export default ExpensesPage