import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const INTERESTS = ["Reading", "Gaming", "Sports", "Music", "Cooking", "Travel"] as const;
const COUNTRIES = ["Germany", "Austria", "Switzerland", "France", "USA", "Other"] as const;

const schema = z
	.object({
		username: z.string().min(3, "Username must be at least 3 characters"),
		email: z.email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		password2: z.string(),
		age: z.number("Age is required").int().min(18, "You must be at least 18").max(120, "Invalid age"),
		interests: z.array(z.string()).min(1, "Pick at least one interest"),
		country: z.string().min(1, "Please select a country"),
	})
	.refine((v) => v.password === v.password2, {
		message: "Passwords do not match",
		path: ["password2"],
	});

type FormValues = z.input<typeof schema>;

const defaultValues: FormValues = {
	username: "",
	email: "",
	password: "",
	password2: "",
	age: 18,
	interests: [],
	country: "",
};

export function RegisterForm() {
	const form = useForm({
		defaultValues,
		validators: { onChange: schema },
		onSubmit: async ({ value }) => {
			// dummy submit
			await new Promise((r) => setTimeout(r, 500));
			alert(JSON.stringify(value, null, 2));
			console.log({ value })
			console.table(value)
		},
	});

	return (
		<form
			className="mx-auto max-w-md"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field name="username">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name}>Username</FieldLabel>
								<Input
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={invalid}
								/>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="email">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									id={field.name}
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={invalid}
								/>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="password">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<Input
									id={field.name}
									type="password"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={invalid}
								/>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="password2">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name}>Repeat password</FieldLabel>
								<Input
									id={field.name}
									type="password"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={invalid}
								/>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="age">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name}>Age</FieldLabel>
								<Input
									id={field.name}
									type="number"
									value={Number.isNaN(field.state.value) ? "" : field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
									aria-invalid={invalid}
								/>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="interests">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<FieldSet data-invalid={invalid}>
								<FieldLegend variant="label">Interests</FieldLegend>
								<div className="grid grid-cols-2 gap-2">
									{INTERESTS.map((interest) => (
										<label key={interest} className="flex items-center gap-2 text-sm">
											<input
												type="checkbox"
												checked={field.state.value.includes(interest)}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(
														e.target.checked
															? [...field.state.value, interest]
															: field.state.value.filter((i) => i !== interest),
													)
												}
											/>
											{interest}
										</label>
									))}
								</div>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</FieldSet>
						);
					}}
				</form.Field>

				<form.Field name="country">
					{(field) => {
						const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={invalid}>
								<FieldLabel htmlFor={field.name}>Country</FieldLabel>
								<select
									id={field.name}
									className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={invalid}
								>
									<option value="">Select a country…</option>
									{COUNTRIES.map((c) => (
										<option key={c} value={c}>
											{c}
										</option>
									))}
								</select>
								{invalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
					{([canSubmit, isSubmitting]) => (
						<div className="flex gap-2">
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Submitting…" : "Register"}
							</Button>
							<Button type="button" variant="outline" onClick={() => form.reset()}>
								Reset
							</Button>
						</div>
					)}
				</form.Subscribe>
			</FieldGroup>
		</form>
	);
}
