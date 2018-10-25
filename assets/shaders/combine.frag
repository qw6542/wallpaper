
varying vec2 v_TexCoord;

uniform sampler2D g_Texture0;
uniform sampler2D g_Texture1;

uniform vec2 g_TexelSize;

void main() {

#if 0
	vec2 iResolution = 1.0 / g_TexelSize;

	vec2 p = v_TexCoord.xy * iResolution / iResolution.x;//normalized coords with some cheat
	                                                         //(assume 1:1 prop)
	float prop = iResolution.x / iResolution.y;//screen proroption
	vec2 m = vec2(0.5, 0.5 / prop);//center coords
	vec2 d = p - m;//vector from center to current fragment
	float r = sqrt(dot(d, d)); // distance of pixel from center

	float power = ( 2.0 * 3.141592 / (2.0 * sqrt(dot(m, m))) ) *
				(0.75 - 0.5);//amount of effect

	float bind;//radius of 1:1 effect
	if (power > 0.0) bind = sqrt(dot(m, m));//stick to corners
	else {if (prop < 1.0) bind = m.x; else bind = m.y;}//stick to borders

	//Weird formulas
	vec2 uv;
	if (power > 0.0)//fisheye
		uv = m + normalize(d) * tan(r * power) * bind / tan( bind * power);
	else if (power < 0.0)//antifisheye
		uv = m + normalize(d) * atan(r * -power * 10.0) * bind / atan(-power * bind * 10.0);
	else uv = p;//no effect for power = 1.0

	vec2 newUvs = vec2(uv.x, uv.y * prop);
	//vec3 col = texture2D(iChannel0, vec2(uv.x, uv.y * prop)).xyz;//Second part of cheat
	
	vec2 am = vec2(0.5, 0.5);
	d = newUvs - am;
	newUvs = am + d * 0.5;
#else
	vec2 newUvs = v_TexCoord;
#endif




	vec3 albedo = texSample2D(g_Texture0, newUvs).rgb;

	//albedo += texSample2D(g_Texture1, newUvs).rgb;
	
	vec3 bloom = texSample2D(g_Texture1, newUvs).rgb;
	//float desat = dot(bloom, vec3(0.299, 0.587, 0.114));
	//albedo += mix(CAST3(desat), bloom, min(length(bloom - albedo) * 0.707, 1.0));
	//albedo += mix(bloom, CAST3(desat), saturate(CAST3(distance(bloom, albedo))));
	
	//albedo = bloom;
	//albedo += 2.0 * bloom * saturate(1.0 - dot(bloom, albedo));
	albedo += bloom;
	
	gl_FragColor = vec4(albedo, 1.0);
	//gl_FragColor = vec4(newUvs, 0, 1.0);
}
