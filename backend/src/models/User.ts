import bcrypt from "bcrypt";
import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  facebook: string;
  twitter: string;
  google: string;
  tokens: AuthToken[];

  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };

  comparePassword: comparePasswordFunction;
  gravatar: (size: number) => string;
};


type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: Error | null, isMatch: any) => void
) => void;

export interface AuthToken {
  accessToken: string;
  kind: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err: any, salt: any) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: any, hash: any) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error | null, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

userSchema.methods.comparePassword = comparePassword;

export const UserModel = mongoose.model<UserDocument>("User", userSchema);