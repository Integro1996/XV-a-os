export function isOrganizer(request) {
  return request.headers.get('oai-authenticated-user-email')?.toLowerCase() === 'albertoafm96@gmail.com';
}
