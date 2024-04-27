import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {emailRegister, handleUpdateUserData, setUser} = useAuth();

    const handleEmailRegister = (data) =>{
        const { email, password, name, photo} = data;

        console.log(email, password, name, photo);

        // Password validation
        if(password.length < 6){
            Swal.fire({
                title:"Invalid Password",
                icon: "error",
                text: "Password Required At Least 6 Charecter",
            });
            return;
        }
        else if(!/[A-Z]/.test(password)){
            Swal.fire({
                title:"Invalid Password",
                icon: "error",
                text: "Password Requried At Least 1 Uppercase Charecter",
            });
            return;
        }
        else if(!/[a-z]/.test(password)){
            Swal.fire({
                title:"Invalid Password",
                icon: "error",
                text: "Password Requried At least 1 Lowercase Charecter",
            });
            return;
        }
    
        // Handle email register
        emailRegister(email, password)
        .then(()=>{
            Swal.fire({
                icon: "success",
                title: "Registered Successfully"
            });
            handleUpdateUserData(name, photo)
            .then(()=>{
                setUser({displayName:name, photoURL: photo})
            })
        })
       .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Register Failed"
            });
       })
    }

    return (
        <section>
            <div className="container mx-auto px-5" data-aos="zoom-in">
                <h1 className="font-bold text-xl text-center mt-5">Register New User</h1>
                <div className="flex justify-center items-center mt-10 mb-20 min-h-[calc(100vh-520px)]">
                    <form onSubmit={handleSubmit(handleEmailRegister)} className="w-[95%] md:w-3/4 lg:w-1/2 mx-auto font-semibold">
                        <label className="input rounded-none input-bordered flex items-center gap-2">
                            <FaUser className="text-gray-500" />
                            <input type="text" className="grow" placeholder="Full Name" name="name" {...register("name", { required: true })}/>
                        </label>
                        {errors.name && <span className="text-red-500 font-semibold block mt-1">This field is required</span>}
                        <label className="input rounded-none input-bordered flex items-center gap-2 mt-5">
                            <MdPhoto className="text-gray-500" />
                            <input type="text" className="grow" placeholder="Photo URL" name="photo" {...register("photo", { required: true })}/>
                        </label>
                        {errors.photo && <span className="text-red-500 font-semibold block mt-1">This field is required</span>}
                        <label className="input rounded-none input-bordered flex items-center gap-2 mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="email" className="grow" placeholder="Email" name="email" {...register("email", { required: true })} />
                        </label>
                        {errors.email && <span className="text-red-500 font-semibold block mt-1">This field is required</span>}
                        <label className="input rounded-none input-bordered flex items-center gap-2 mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type='password' placeholder="Password" className="grow" name="password"  {...register("password", { required: true })}/>
                        </label>
                        {errors.password && <span className="text-red-500 font-semibold block mt-1">This field is required</span>}
                        <button className="btn rounded-none hover:bg-[#ff0066] hover:text-white w-full mt-5" type="submit">Register</button>
                        <p className="text-center mt-3 text-gray-500 font-bold"></p>
                        <h3 className="text-center mt-3">Already have an account? Please <Link to={'/login'} className="text-[#ff0066] font-bold">Login</Link> Now.</h3>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;