import CustomColorPicker from '@/components/custom/CustomColorPicker'
import CustomInput from '@/components/custom/CustomInput'
import { CustomSelect } from '@/components/custom/CustomSelect'
import MultiSelect from '@/components/custom/MultiSelect'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useMapStore } from '@/stores/useMapStore'
import { StoreMapSchema, StoreMapType } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import StoreCordinates from './StoreCordinates'

const SvgEditor = ({svgRef} : {svgRef : React.MutableRefObject<SVGSVGElement | null>} ) => {

    const { selectedMapLocation  , hoverPointer } = useMapStore();
 
    const form = useForm<StoreMapType>({ 
        resolver : zodResolver(StoreMapSchema) ,
        defaultValues: {
            color : "",
            id : "",
            category : "",
            title : "",
            cordinates : [],
        }
     });

    useEffect(() => {

        console.log(">>>>  checking  selectd actions  <<<<<");
        console.log(selectedMapLocation);
        console.log(">>>>  checking  selectd actions  <<<<<");

        if (selectedMapLocation && svgRef.current) {
            const svgElement = selectedMapLocation;
            const svg = svgRef.current;
            
            const color = svgElement.getAttribute('fill') || '';
            const id = svgElement.getAttribute('id') || '';
            let logo = '';
            let title =  '';
            let category = '';

            if(id){
                const groupTag = svg.querySelector(`g[id=${id}]`);
                if(groupTag){
                     category = groupTag.getAttribute('category') || '';
                     title = groupTag.querySelector('text')?.textContent || ""
                     logo = groupTag.querySelectorAll("image")[0]?.getAttribute('href') || "";
                }
            }

            form.reset({
                color,
                id,
                category ,
                logo,
                title,
            });


            console.log("Form reset called with values:", {
                color,
                id,
                category,
                logo,
                title,
            });
        }

    }, 

    [selectedMapLocation]

   );
    


 const priamryTagList = [ "Electronics" , "Food" , 'Boutiques' , "Cosmetics" , 'Grocery'  ];

    const handleSubmit = ({color , id , category , title , logo} : StoreMapType ) => {
    
     const prevGrp = svgRef.current!.querySelector<SVGElement>(`g[id='${id}']`);
     if(prevGrp){
        prevGrp.remove()
     }


       selectedMapLocation!.setAttribute('fill' , color);
       selectedMapLocation!.setAttribute('id' , id);


        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const logoElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        const catElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        group.setAttribute('id', id);
        group.setAttribute('transform', `translate(${hoverPointer!.x.toFixed(3)}, ${hoverPointer!.y.toFixed(3)})`);
        group.setAttribute('category', category);
        
        if(!svgRef.current!.querySelector('clipPath[id]')){
             const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
             const clipPathId = 'clip-image';
             clipPath.setAttribute('id', clipPathId);
             const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
             rect.setAttribute('x', '-15');
             rect.setAttribute('y', '-40');
             rect.setAttribute('width', '25');
             rect.setAttribute('height', '25');
             rect.setAttribute('rx', '5');
             clipPath.appendChild(rect);
             svgRef.current!.appendChild(clipPath); 
         }

        if(logo){
             logoElement.setAttribute('href', logo);
             logoElement.setAttribute('x', "-15");
             logoElement.setAttribute('y', "-40");
             logoElement.setAttribute('width', '25');
             logoElement.setAttribute('height', '25');
             logoElement.setAttribute('filter', 'url(#shadow)');
             logoElement.setAttribute('clip-path', `url(#clip-image)`);
             logoElement.classList.add('show-effect');
             group.appendChild(logoElement);
        }else{
        
            catElement.setAttribute('href', '/gadgets.png');
            catElement.setAttribute('x', "-10");
            catElement.setAttribute('y', "-40");
            catElement.setAttribute('width', '25');
            catElement.setAttribute('height', '25');
            catElement.setAttribute('filter', 'url(#shadow)');
            catElement.setAttribute('clip-path', `url(#clip-image)`);
            group.appendChild(catElement);
        }
        
        titleElement.setAttribute('x', '0');
        titleElement.setAttribute('y', '0');
        titleElement.setAttribute('text-anchor', 'middle');
        titleElement.setAttribute('font-size', '8');
        titleElement.textContent = title;
        
        group.appendChild(titleElement);
    
        svgRef.current!.appendChild(group);
        console.log(group);
        console.log(selectedMapLocation);

    }

  return (
    <Form 
        {...form}
    >
        <form 
            className='space-y-5'
            onSubmit={form.handleSubmit(handleSubmit)}
            >
             <CustomInput
                control={form.control}
                label='Location ID'
                placeholder='Location ID'
                name='id'
            />
            <CustomInput
                control={form.control}
                label='Store Logo'
                placeholder='Tap store logo'
                name='logo'
                required={false}
            />
             <CustomInput
                control={form.control}
                label='Store Name'
                placeholder='Enter Store Name'
                name='title'
            />
            <CustomSelect
                control={form.control}
                items={priamryTagList.map((v) => ({label : v , value : v })) }
                label='Store Category'
                name='category'
                placeholder='Tap to select store tags'
            />
            <CustomColorPicker
                control={form.control}
                label='Background Color'
                placeholder='select color'
                name='color'
            />
            <StoreCordinates 
                form={form}
                label='Co-ordinates'
            />
            <Button type='submit'>Submit</Button>
        </form> 
    </Form>
  )
}

export default SvgEditor