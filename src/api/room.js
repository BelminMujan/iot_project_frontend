export const createRoom = async (title, xAxis, yAxis, hasSensor) => {
    return new Promise(async (resolve, reject)=>{
        try {
            let res = await fetch(`${process.env.REACT_APP_API}/api/Room`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, xAxis, yAxis, hasSensor }),
            });
    
            let data = await res.json();
            resolve(data)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
   
}