import React, { useState, useEffect } from "react";
import "./CarSearch.css";
import Car from "../components/Car";
import Navbarcomp from "../components/Navbarcomp";
import AboutUs from "../components/AboutUs";
const CarSearch = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        fuelType: [],
        carType: [],
        seater: [],
        transmission: [],
        priceRange: 1000,
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch("http://localhost:3000/cars");
            if (response.ok) {
                const data = await response.json();
                setCars(data);
                setFilteredCars(data); // Initially show all cars
            } else {
                console.error("Failed to fetch cars");
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const applyFilters = () => {
        let filtered = cars;

        // Filter by fuel type
        if (filters.fuelType.length > 0) {
            filtered = filtered.filter((car) =>
                filters.fuelType.includes(car.fuelType)
            );
        }

        // Filter by car type
        if (filters.carType.length > 0) {
            filtered = filtered.filter((car) =>
                filters.carType.includes(car.type)
            );
        }

        // Filter by seater
        if (filters.seater.length > 0) {
            filtered = filtered.filter((car) =>
                filters.seater.includes(car.seater)
            );
        }

        // Filter by transmission (case insensitive)
        if (filters.transmission.length > 0) {
            filtered = filtered.filter((car) =>
                filters.transmission.includes(car.transmission.toLowerCase())
            );
        }

        // Filter by search term
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter((car) =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price range
        filtered = filtered.filter(
            (car) =>
                parseFloat(car.pricing.replace(/[^\d.]/g, "")) <=
                filters.priceRange
        );

        setFilteredCars(filtered);
    };

    const handleFilterChange = (filterType, value) => {
        const updatedFilters = { ...filters };
        const index = updatedFilters[filterType].indexOf(value);

        if (index === -1) {
            updatedFilters[filterType].push(value);
        } else {
            updatedFilters[filterType].splice(index, 1);
        }

        setFilters(updatedFilters);
        applyFilters();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        applyFilters();
    };

    const handlePriceRangeChange = (event) => {
        setFilters({ ...filters, priceRange: parseInt(event.target.value) });
        applyFilters();
    };
    console.log(filteredCars);

    return (
        <>
        <Navbarcomp/>
        <div className="header-image">
                <p>Car Search</p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by car model"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        <div className="car-search-container">
            
            <div className="sidebar">
                <h3>Filters</h3>
                <div className="filter-group">
                    <h4>Fuel Type</h4>
                    <label>
                        <input
                            type="checkbox"
                            value="Petrol"
                            checked={filters.fuelType.includes("Petrol")}
                            onChange={() =>
                                handleFilterChange("fuelType", "Petrol")
                            }
                        />
                        Petrol
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Diesel"
                            checked={filters.fuelType.includes("Diesel")}
                            onChange={() =>
                                handleFilterChange("fuelType", "Diesel")
                            }
                        />
                        Diesel
                    </label>
                </div>
                <div className="filter-group">
                    <h4>Car Type</h4>
                    <label>
                        <input
                            type="checkbox"
                            value="SUV"
                            checked={filters.carType.includes("SUV")}
                            onChange={() =>
                                handleFilterChange("carType", "SUV")
                            }
                        />
                        SUV
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Sedan"
                            checked={filters.carType.includes("Sedan")}
                            onChange={() =>
                                handleFilterChange("carType", "Sedan")
                            }
                        />
                        Sedan
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Hatchback"
                            checked={filters.carType.includes("Hatchback")}
                            onChange={() =>
                                handleFilterChange("carType", "Hatchback")
                            }
                        />
                        Hatchback
                    </label>
                </div>
                <div className="filter-group">
                    <h4>Seater</h4>
                    <label>
                        <input
                            type="checkbox"
                            value="5 seater"
                            checked={filters.seater.includes("5 seater")}
                            onChange={() =>
                                handleFilterChange("seater", "5 seater")
                            }
                        />
                        5 Seater
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="7 seater"
                            checked={filters.seater.includes("7 seater")}
                            onChange={() =>
                                handleFilterChange("seater", "7 seater")
                            }
                        />
                        7 Seater
                    </label>
                </div>
                <div className="filter-group">
                    <h4>Transmission</h4>
                    <label>
                        <input
                            type="checkbox"
                            value="automatic"
                            checked={filters.transmission.includes("automatic")}
                            onChange={() =>
                                handleFilterChange("transmission", "automatic")
                            }
                        />
                        Automatic
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="manual"
                            checked={filters.transmission.includes("manual")}
                            onChange={() =>
                                handleFilterChange("transmission", "manual")
                            }
                        />
                        Manual
                    </label>
                </div>
                <div className="filter-group">
                    <h4>Price Range</h4>
                    <input
                        type="range"
                        min={0}
                        max={1000}
                        value={filters.priceRange}
                        onChange={handlePriceRangeChange}
                    />
                    <div>Max Price: ${filters.priceRange}</div>
                </div>
            </div>
            <div className="main-content">
                
                <div className="car-list">
                    {filteredCars.map((car) => (
                        <Car
                            carId={car.id}
                            name={car.name}
                            type={car.type}
                            fuelType={car.fuelType}
                            seater={car.seater}
                            pricePerHour={car.pricing}
                            imageUrl={car.images.image1}
                            transmission={car.transmission}
                        />
                    ))}
                </div>
            </div>
        </div>
        <AboutUs/>
        </>
    );
};

export default CarSearch;