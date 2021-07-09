export const users = [
  {
    userName: "",
    userEmail: "",
    userPass: "",
    paymentInfo: {
      debit: {
        owner: "",
        cardNumber: "",
        expiration: "",
        cvv: ""
      },
      credit: {
        owner: "",
        cardNumber: "",
        expiration: "",
        cvv: ""
      }
    },
    addressInfo: [
      {
        country: "",
        address: "",
        zip: ""
      }
    ],
    picture: ""
  }
]

export default users;