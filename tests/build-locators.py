import json,pathlib,re
p=pathlib.Path(__file__).resolve().parents[1]
world=json.loads((p/'docs/field-guide/natural-earth-source.geojson').read_text())
# Whole-country locators, never site-boundary maps. Positions are calculated from map geometry.
countries=['Peru','Cambodia','United Republic of Tanzania','Croatia','Australia','Jordan']
features=world['features']
for f in features:
 if 'Tanzania' in f['properties']['ADMIN']:print('Tanzania match',f['properties']['ADMIN'])
paths=[];centres={}
for f in features:
 name=f['properties']['ADMIN'];geo=f['geometry'];polys=geo['coordinates'] if geo['type']=='MultiPolygon' else [geo['coordinates']]
 d='';largest=[]
 for poly in polys:
  ring=poly[0]
  if len(ring)>len(largest):largest=ring
  for ring in poly:
   d+='M'+'L'.join(f'{(x+180)*2.5:.1f},{(90-y)*2.5:.1f}' for x,y,*_ in ring)+'Z'
 paths.append((name,d))
 if name in countries:
  ring=largest;area=cx=cy=0
  for a,b in zip(ring,ring[1:]):
   cross=a[0]*b[1]-b[0]*a[1];area+=cross;cx+=(a[0]+b[0])*cross;cy+=(a[1]+b[1])*cross
  lon=cx/(3*area);lat=cy/(3*area);centres[name]=((lon+180)*2.5,(90-lat)*2.5)
for i,country in enumerate(countries):
 if country not in centres:raise Exception(country)
 x,y=centres[country]
 land=''.join(f'<path d="{d}" fill="{("#b47b46" if n==country else "#d3d0bc")}"/>' for n,d in paths)
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450" role="img"><title>World country locator: {country} highlighted, not site boundaries</title><rect width="900" height="450" fill="#eeede3"/><g fill="none" stroke="#dad9cd" stroke-width=".6"><path d="M0 150H900M0 225H900M0 300H900M225 0V450M450 0V450M675 0V450"/></g>{land}<circle cx="{x:.1f}" cy="{y:.1f}" r="17" fill="none" stroke="#564229" stroke-width="1"/><circle cx="{x:.1f}" cy="{y:.1f}" r="4" fill="#564229"/></svg>'
 (p/f'assets/locator-{i}.svg').write_text(svg)
