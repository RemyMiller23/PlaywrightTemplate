export const authPayloads = {
    /**
    * Create Token Payload
    * @param {string} username - username of the user
    * @param {string} password - password of the user
    */
    tokenPayload: function (username,password) {
        return {
            "username": username,
            "password": password,
        }
    },
}

export const bookingPayloads = {
    /**
    * Create Booking Payload
    * @param {string} firstName - First Name of the booking user
    * @param {string} lastName - Last Name of the booking user
    * @param {number} totalPrice - Total Price of the booking user
    * @param {boolean} depositPaid - Deposit Paid of the booking user
    * @param {string} checkInDate - Check In Date of the booking user
    * @param {string} checkOutDate - Check Out Date of the booking user
    * @param {string} additionalNeeds - Additional Needs of the booking user
    */
    createBookingPayload: function (firstName,lastName,totalPrice,depositPaid,checkInDate,checkOutDate,additionalNeeds) {
        return {
            "firstname" : firstName,
            "lastname" : lastName,
            "totalprice" : totalPrice,
            "depositpaid" : depositPaid,
            "bookingdates" : {
                "checkin" : checkInDate,
                "checkout" : checkOutDate
            },
            "additionalneeds" : additionalNeeds
        }
    },
}



