
uniform mat4 g_ModelViewProjectionMatrix;

attribute vec3 a_Position;
attribute vec2 a_TexCoord;

varying vec2 v_TexCoord;
varying vec3 v_ScreenCoord;

void main() {
#ifdef TRANSFORM
	gl_Position = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix);
	v_ScreenCoord = gl_Position.xyw;
#else
	gl_Position = vec4(a_Position, 1.0);
	v_ScreenCoord = mul(vec4(a_Position, 1.0), g_ModelViewProjectionMatrix).xyw;
#endif

#ifdef HLSL
	v_ScreenCoord.y = -v_ScreenCoord.y;
#endif

	v_TexCoord = a_TexCoord;
}
