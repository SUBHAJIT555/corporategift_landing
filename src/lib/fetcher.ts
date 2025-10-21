export async function fetcher<T = unknown>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  // WooCommerce often returns HTML on 403/404 instead of JSON
  if (!res.ok) {
    const text = await res.text();
    let message: string;
    try {
      const json = JSON.parse(text);
      message = json.message || json.error || res.statusText;
    } catch {
      message = text || res.statusText;
    }
    throw new Error(`Fetch error ${res.status}: ${message}`);
  }

  // Parse JSON safely
  try {
    return (await res.json()) as T;
  } catch (error) {
    throw new Error(`Invalid JSON from ${input}: ${error}`);
  }
}
