import { FaPaypal, FaTrash, FaTrashAlt } from "react-icons/fa";
import useCarts from "../../Hooks/useCarts";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdPayments } from "react-icons/md";


const Cart = () => {
    const [cart,refetch] = useCarts();
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((total, item) =>total + item.price,0);
    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
       
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
          
            axiosSecure.delete(`/carts/${id}`)
            .then(res =>{
                if(res.data.deletedCount > 0){
                        Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch();

                }
            })
            
            }
          });

    }
    return (
        <div >
            <div className=" flex justify-evenly items-center mb-5">
            <h2 className=" lg:text-2xl  font-bold">Total Orders: {cart.length}</h2>
            <h2 className="lg:text-2xl font-bold ">Total Price: {totalPrice}</h2>
           { cart.length ? <Link to ='/dashboard/payment'>
            <button className="btn text-xl  bg-green-500  ">Pay now <MdPayments /> </button>
            </Link>:
             <button disabled className="btn text-xl btn-primary ">Pay now</button>
            }
            </div>


            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead className="">
      <tr className="bg-green-400  ">
        <th>
          No
        </th>
        <th>image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className="">
        {
            cart.map((item, index) =>  <tr className=""  key={item._id}>
                <th>
                    {index +1}
                  
                </th>
                <td className="">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  
                  </div>
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    ${item.price}
                </td>
                <th>
                  <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-lg text-green-600"><FaTrashAlt></FaTrashAlt></button>
                </th>
              </tr> )
        }
  
     
    </tbody>
   
  
    
  </table>
</div>
            
        </div>
    );
};

export default Cart;