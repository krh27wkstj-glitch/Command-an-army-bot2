# Command An Army — bot gratis

Este bot usa **GitHub Actions + un webhook de Discord**, así que no necesitas pagar un VPS.

## Qué detecta

Comprueba los datos públicos de la experiencia de Roblox y avisa en Discord si cambian la descripción o la fecha de actualización.

## Instalación

1. Crea un repositorio **público** en GitHub.
2. Sube estos archivos.
3. En Discord crea un webhook para el canal donde quieres recibir las alertas.
4. En GitHub entra en:
   `Settings -> Secrets and variables -> Actions`
5. En **Secrets** crea:
   `DISCORD_WEBHOOK_URL`
   y pega el webhook.
6. Ve a `Actions -> Command An Army Monitor -> Run workflow`.
7. Después quedará programado aproximadamente cada 10 minutos.

## Importante

Esto NO puede leer directamente el botón/ventana de summon o shop dentro de una partida de Roblox. Roblox expone públicamente datos del juego, pero no la rotación interna de unidades.

Si el desarrollador publica la rotación en una API, una página o un canal que permita bots, se puede adaptar este proyecto para detectar **el nombre exacto de la unidad** y avisarte cuando aparezca.

No uses una cuenta normal de Discord como "self-bot" para leer mensajes automáticamente.
