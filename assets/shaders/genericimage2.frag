
#include "common_fragment.h"

uniform sampler2D g_Texture0; // {"material":"Albedo"}

uniform float g_Brightness; // {"material":"Brightness","default":1,"range":[0,2]}
uniform float g_UserAlpha; // {"material":"Alpha","default":1,"range":[0,1]}

varying vec2 v_TexCoord;

void main() {

	vec2 texCoord = v_TexCoord.xy;
	vec4 color = texSample2D(g_Texture0, texCoord);

	color.rgb *= g_Brightness;
	color.a *= g_UserAlpha;

	gl_FragColor = color;
}
