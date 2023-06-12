const validateForm = (values: any): string[] => {
  const errors: string[] = [];

  if ("position" in values) {
    if (!values.position) {
      errors.push("Position is required");
    }
  }

  if ("location" in values) {
    if (!values.location) {
      errors.push("Location is required");
    }
  }

  if ("type" in values) {
    if (!values.type) {
      errors.push("Type is required");
    }
  }

  if ("who_we_are" in values) {
    if (!values.who_we_are) {
      errors.push("Who We Are is required");
    }
  }

  if ("looking_for" in values) {
    if (!values.looking_for) {
      errors.push("Looking For is required");
    }
  }

  if ("why_apply" in values) {
    if (!values.why_apply) {
      errors.push("Why Apply is required");
    }
  }

  if ("title" in values) {
    if (!values.title) {
      errors.push("Title is required");
    } else if (values.title.length > 255) {
      errors.push("Title must be less than 255 characters");
    }
  }

  if ("subtitle" in values) {
    if (!values.subtitle) {
      errors.push("Subtitle is required");
    } else if (values.subtitle.length > 255) {
      errors.push("Subtitle must be less than 255 characters");
    }
  }

  if ("description" in values) {
    if (!values.description) {
      errors.push("Description is required");
    }
  }

  if ("buttonText" in values) {
    if (!values.buttonText) {
      errors.push("Button Text is required");
    }
  }

  if ("name" in values) {
    if (!values.name) {
      errors.push("Name is required");
    }
  }

  if ("role" in values) {
    if (!values.role) {
      errors.push("Role is required");
    }
  }

  if ("bio" in values) {
    if (!values.bio) {
      errors.push("Biography is required");
    }
  }

  if ("message" in values) {
    if (!values.message) {
      errors.push("Message is required");
    }
  }

  if ("address" in values) {
    if (!values.address) {
      errors.push("Address is required");
    }
  }

  if ("firstName" in values) {
    if (!values.firstName) {
      errors.push("First name is required");
    } else if (values.firstName.length > 50) {
      errors.push("First name must be less than 50 characters");
    }
  }

  if ("first_name" in values) {
    if (!values.first_name) {
      errors.push("First name is required");
    } else if (values.first_name.length > 50) {
      errors.push("First name must be less than 50 characters");
    }
  }

  if ("lastName" in values) {
    if (!values.lastName) {
      errors.push("Last name is required");
    } else if (values.lastName.length > 50) {
      errors.push("Last name must be less than 50 characters");
    }
  }

  if ("last_name" in values) {
    if (!values.last_name) {
      errors.push("Last name is required");
    } else if (values.last_name.length > 50) {
      errors.push("Last name must be less than 50 characters");
    }
  }

  if ("fullName" in values) {
    if (!values.fullName) {
      errors.push("Full name is required");
    } else if (values.fullName.length > 50) {
      errors.push("Full name must be less than 50 characters");
    }
  }

  if ("username" in values) {
    if (!values.username) {
      errors.push("Username is required");
    } else if (values.username.length > 50) {
      errors.push("Username must be less than 50 characters");
    } else if (!/^[A-Za-z]+$/i.test(values.username)) {
      errors.push("Username can only contain letters");
    } else if (values.username.length < 3) {
      errors.push("Username must be at least 3 characters");
    }
  }

  if ("email" in values) {
    if (!values.email) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.push("Email is invalid");
    }
  }

  if ("password" in values) {
    if (!values.password) {
      errors.push("Password is required");
    } else if (values.password.length < 8) {
      errors.push("Password must be at least 8 characters");
    } else if (!/[a-z]/.test(values.password)) {
      errors.push("Password must contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(values.password)) {
      errors.push("Password must contain at least one uppercase letter");
    } else if (!/[0-9]/.test(values.password)) {
      errors.push("Password must contain at least one digit");
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password)) {
      errors.push("Password must contain at least one special character");
    }
  }

  if ("url" in values) {
    if (!values.url) {
      errors.push("URL is required");
    } else if (!/^http[s]?:\/\/.+/.test(values.url)) {
      errors.push("URL must start with http:// or https://");
    }
  }

  if ("phone" in values) {
    if (!values.phone) {
      errors.push("Phone number is required");
    } else if (!/^\+?\d{8,15}$/.test(values.phone)) {
      errors.push("Phone number is invalid");
    }
  }

  if ("resume" in values) {
    if (!values.resume) {
      errors.push("Resume is required");
    }
  }

  if ("zipcode" in values) {
    if (!values.zipcode) {
      errors.push("Zipcode is required");
    }
    if (!/^\d{5}$/.test(values.zipcode)) {
      errors.push(
        "The zip code field must be exactly 5 digits long and contain only numbers."
      );
    }
  }

  if ("city" in values) {
    if (!values.city) {
      errors.push("City is required");
    }
    if (!/^[a-zA-Z]+$/.test(values.city)) {
      errors.push("The city field must contain only alphabetic characters.");
    }
    if (values.city.length < 2) {
      errors.push("The city field must be at least 2 characters long.");
    }
    if (values.city.length > 50) {
      errors.push("The city field cannot exceed 50 characters.");
    }
  }

  if ("creditCard" in values) {
    if (!values.creditCard) {
      errors.push("Credit card number is required");
    } else if (!/^\d{16}$/.test(values.creditCard)) {
      errors.push("Credit card number is invalid");
    }
  }

  if ("securityCode" in values) {
    if (!values.securityCode) {
      errors.push("Security code is required");
    } else if (!/^\d{3}$/.test(values.securityCode)) {
      errors.push("Security code is invalid");
    }
  }

  return errors;
};

export default validateForm;
