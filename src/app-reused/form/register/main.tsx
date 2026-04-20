
export default function RegisterForm() {
    return <form className="register-form display-none">
        <fieldset className="form_input">
            <legend className="form_legend">Email</legend>
            <input type="text" placeholder="Email" />
        </fieldset>
        <button className="submit">Register</button>
    </form>
}