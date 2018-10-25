
#include "common_fragment.h"

uniform sampler2D g_Texture0;

varying vec2 v_TexCoord;
varying vec4 v_Color;
varying float v_Blur;

void main() {
	float albedo = texSample2D(g_Texture0, v_TexCoord).r;
	
	float blurAmount = v_Blur * 0.4;
	albedo = smoothstep(0.4 - blurAmount, 0.5 + blurAmount, albedo);
	
	gl_FragColor = v_Color * albedo;
}