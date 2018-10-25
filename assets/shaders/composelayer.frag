
varying vec2 v_TexCoord;
varying vec3 v_ScreenCoord;

uniform sampler2D g_Texture0; // {"material":"ui_editor_properties_framebuffer","hidden":true}

void main() {
	
	vec2 texCoord = v_ScreenCoord.xy / v_ScreenCoord.z * vec2(0.5, 0.5) + 0.5;
	
	//gl_FragColor = vec4(v_TexCoord, 0, 1);
	gl_FragColor = texSample2D(g_Texture0, texCoord);
	//gl_FragColor.xy = step(0.5, texCoord);
	
}
