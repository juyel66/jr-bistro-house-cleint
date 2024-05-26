import { useLoaderData, useNavigate } from "react-router-dom";
import SectionsTitle from "../../SectionsTitle/SectionsTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaUpload } from "react-icons/fa";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItem = () => {
    const {name, category, recipe, price,_id} = useLoaderData();

    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = userAxiosPublic()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
      console.log(data);          
      
  
      const imageFile = {image: data.image[0] }
      const res = await axiosPublic.post(image_hosting_api,imageFile, {
          headers: {
              'Content-Type' : 'multipart/form-data'
          }
      });
      
      if(res.data.success){
        // now send the menu item data to the server with the image 
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url
        }
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(menuRes.data)
        if(menuRes.data.modifiedCount > 0){
          // show success popup 
          reset()
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name} is updated to the menu`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/manageItems')
        }
      }
      console.log('with img url',res.data);
    };
    return (
        <div>
            <SectionsTitle heading='Refresh info' subHading='Update an Item'></SectionsTitle>

            <div>
            <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full  ">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            </div>
            <input
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              {...register("name",{required: true})}
              className="input input-bordered w-full "
            />
          </label>

          <div className="flex gap-3">
            {/* category  */}
            <label className="form-control w-full my-6 ">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select defaultValue={category}
                {...register("category", {required: true})}
                className="select select-bordered w-full "
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>
            {/* price  */}

            <label className="form-control w-full my-6 ">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                // placeholder="Price"
                defaultValue={price}
                {...register("price", {required: true})}
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* recipe details  */}

          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
            defaultValue={recipe}
            {...register('recipe',{required: true})}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </label>

          <div  className="mt-2 mb-2">
          <input {...register("image",{required: true})} type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
          </div>

          <button  className="btn bg-orange-500 text-white text-xl ">Update Item <FaUpload></FaUpload></button>
        </form>
      </div>
            </div>
            
        </div>
    );
};

export default UpdateItem;