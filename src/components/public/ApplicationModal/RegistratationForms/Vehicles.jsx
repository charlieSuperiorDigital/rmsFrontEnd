import { useState } from "react"
import { api } from "../../../../services/api"

const Vehicles = ({ tenantId, setActiveSection }) => {
  const [vehicles, setVehicles] = useState([
    { MakeAndModel: "", year: "", color: "", plate: "", state: "" }
  ])

  const handleAddVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        MakeAndModel: "",
        year: "",
        color: "",
        plate: "",
        state: ""
      }
    ])
  }

  const handleInputChange = (index, event, key) => {
    const newVehicles = [...vehicles]
    newVehicles[index][key] = event.target.value
    setVehicles(newVehicles)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const vehiclePromises = vehicles.map(async (vehicle) => {
        const response = await api.post("/vehicles", {
          ...vehicle,
          tenantId
        })
        return response.data
      })
      // Wait for all the promises to resolve
      const savedVehicles = await Promise.all(vehiclePromises)
      console.log(savedVehicles)
      setActiveSection("otherInfo")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="registrationContainer d-flex justify-content-center">
      <div className="formRegistrationOrder d-flex flex-column justify-content-start align-items-center">
        <h2 className="d-flex justify-content-center mt-3 VehicleText">
          Vehicles
        </h2>
        <form className="resetForm" onSubmit={handleSubmit}>
          {vehicles.map((vehicle, index) => (
            <div key={index}>
              <h3 className="Vtext">Vehicle {index + 1}</h3>
              <input
                className="form-control inputReset"
                type="text"
                placeholder="MAKE & MODEL"
                value={vehicle.MakeAndModel}
                onChange={(event) =>
                  handleInputChange(index, event, "MakeAndModel")
                }
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="YEAR"
                value={vehicle.year}
                onChange={(event) => handleInputChange(index, event, "year")}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="COLOR"
                value={vehicle.color}
                onChange={(event) => handleInputChange(index, event, "color")}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="PLATE #"
                value={vehicle.plate}
                onChange={(event) => handleInputChange(index, event, "plate")}
              />
              <input
                className="form-control inputReset"
                type="text"
                placeholder="STATE"
                value={vehicle.state}
                onChange={(event) => handleInputChange(index, event, "state")}
              />
            </div>
          ))}
          <p className="addVehicle" onClick={handleAddVehicle}>
            + Add Vehicle
          </p>
          <button
            className="bgButton d-flex align-items-center justify-content-center"
            type="submit"
          >
            <span className="submitBtn">Submit</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Vehicles
