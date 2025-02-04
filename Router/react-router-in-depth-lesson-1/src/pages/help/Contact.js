import { Form, redirect, useActionData, useRouteError } from "react-router-dom";

function Contact() {
  const error = useActionData();
  return (
    <div className="contact">
      <h2>Contact</h2>
      <Form method="post" action="/help/contact">
        <label>
          Email
          <input
            type="text"
            placeholder="email"
            name="email"
            style={{ color: "black" }}
          />
        </label>
        <label>
          Description
          <textarea
            placeholder="Description"
            name="message"
            style={{ color: "black" }}
          />
        </label>
        <button type="submit">Submit</button>
      </Form>
      {error && error.error && <p>{error.error}</p>}
    </div>
  );
}

export default Contact;

export const submitForm = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };
  console.log(submission);
  if (submission.message.length < 10) {
    return { error: "Please enter message greater than 10 characters" };
  }
  return redirect("/help");
};
